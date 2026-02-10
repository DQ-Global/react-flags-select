import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import { countries as AllCountries } from "../../data";
import {
  countryCodeToPascalCase,
  getCountryCodes,
  isCustomLabelObject,
  isCountryLabelMatch,
} from "../../utils";
import type {
  CountryCodes,
  CustomLabel,
  CustomLabels,
  OnSelect,
} from "../../types";
import * as flags from "../Flags";

import styles from "./ReactFlagsSelect.module.scss";

const defaultPlaceholder = "Select a country";
const defaultSearchPlaceholder = "Search";

type Flags = typeof flags;
type FlagKey = keyof Flags;

export type Props = {
  className?: string;
  selected: string;
  onSelect: OnSelect;
  selectButtonClassName?: string;
  showSelectedLabel?: boolean;
  showSecondarySelectedLabel?: boolean;
  showOptionLabel?: boolean;
  showSecondaryOptionLabel?: boolean;
  selectedSize?: number;
  optionsSize?: number;
  customLabels?: CustomLabels;
  placeholder?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  alignOptionsToRight?: boolean;
  countries?: CountryCodes;
  preferredCountries?: CountryCodes;
  blacklistCountries?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  id?: string;
  rfsKey?: string;
};

const ReactFlagsSelect: React.FC<Props> = ({
  className,
  selected,
  onSelect,
  selectButtonClassName,
  showSelectedLabel = true,
  showSecondarySelectedLabel = true,
  showOptionLabel = true,
  showSecondaryOptionLabel = true,
  selectedSize = 16,
  optionsSize = 16,
  customLabels = {},
  placeholder,
  searchable = false,
  searchPlaceholder,
  alignOptionsToRight = false,
  countries,
  preferredCountries,
  blacklistCountries = false,
  fullWidth = true,
  disabled = false,
  id,
  rfsKey = "rfs",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [countriesOptions, setCountriesOptions] = useState<CountryCodes>([]);
  const [
    filteredCountriesOptions,
    setFilteredCountriesOptions,
  ] = useState<CountryCodes>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const selectedFlagRef = useRef<HTMLButtonElement | null>(null);
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const filterTextRef = useRef<HTMLInputElement | null>(null);

  // For portal dropdown positioning
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const validSelectedValue = countriesOptions.includes(selected)
    ? selected
    : "";

  const options = filterValue ? filteredCountriesOptions : countriesOptions;

  const getFlag = (key: FlagKey): Flags[FlagKey] => flags[key];

  const getSelectedFlag = (): React.ReactElement => {
    const selectedFlagName = countryCodeToPascalCase(validSelectedValue);
    const SelectedFlag = getFlag(selectedFlagName as FlagKey);
    return <SelectedFlag />;
  };

  const getLabel = (countryCode: string) => {
    return customLabels[countryCode] || AllCountries[countryCode];
  };

 const updateDropdownPosition = React.useCallback(() => {
    if (selectedFlagRef.current) {
      const rect = selectedFlagRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  const toggleDropdown = () => {
    if (!isDropdownOpen && selectedFlagRef.current) {
      updateDropdownPosition();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onOptionSelect = (countryCode: string) => {
    setFilterValue("");
    onSelect(countryCode);
    toggleDropdown();
  };

  const filterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setFilterValue(value);

    if (!value) {
      setFilteredCountriesOptions([]);
      return;
    }

    const filteredCountriesOptions = countriesOptions.filter((key) => {
      const label = getLabel(key);
      if (isCustomLabelObject(label)) {
        return (
          isCountryLabelMatch((label as CustomLabel)?.primary, value) ||
          isCountryLabelMatch((label as CustomLabel)?.secondary, value)
        );
      }
      return isCountryLabelMatch(label as string, value);
    });

    setFilteredCountriesOptions(filteredCountriesOptions);
  };

  const closeDropdown = (e: MouseEvent) => {
    // Close if click is outside button and dropdown
    if (
      selectedFlagRef.current &&
      !selectedFlagRef.current.contains(e.target as Node) &&
      optionsRef.current &&
      !optionsRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdwownWithKeyboard = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.keyCode === 27) {
      //esc key: close dropdown
      setIsDropdownOpen(false);
    }
  };

  const onSelectWithKeyboard = (
    e: React.KeyboardEvent,
    countryCode: string
  ) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      //enter key: select option
      onOptionSelect(countryCode);
      setIsDropdownOpen(false);
    } else if (e.keyCode === 27) {
      //esc key: close dropdown
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Get all country codes (filtered by countries/blacklistCountries)
    const allCodes = getCountryCodes(countries, blacklistCountries);
    if (preferredCountries && preferredCountries.length > 0) {
      // Remove duplicates and keep order: preferred first, then the rest
      const preferred = preferredCountries.filter((code) => allCodes.includes(code));
      const rest = allCodes.filter((code) => !preferred.includes(code));
      setCountriesOptions([...preferred, ...rest]);
    } else {
      setCountriesOptions(allCodes);
    }
  }, [countries, blacklistCountries, preferredCountries]);

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("click", closeDropdown);
    } else {
      window.removeEventListener("click", closeDropdown);
    }
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleScrollOrResize = () => {
      updateDropdownPosition();
    };
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isDropdownOpen, updateDropdownPosition]);

  const displayLabel = getLabel(validSelectedValue);

  const btnId = `${rfsKey}-btn`;

  // Helper to split preferred and rest for rendering
  const getPreferredAndRest = () => {
    if (!preferredCountries || preferredCountries.length === 0) {
      return { preferred: [], rest: options };
    }
    const preferred = options.filter((code) => preferredCountries.includes(code));
    const rest = options.filter((code) => !preferredCountries.includes(code));
    return { preferred, rest };
  };

  return (
    <div
      className={cx(styles.flagsSelect, className, {
        [styles.flagsSelectInline]: !fullWidth,
      })}
      id={id}
      data-testid={rfsKey}
      style={{ position: "relative" }}
    >
      <button
        ref={selectedFlagRef}
        id={btnId}
        type="button"
        className={cx(styles.selectBtn, selectButtonClassName, {
          [styles.disabledBtn]: disabled,
        })}
        style={{ fontSize: selectedSize }}
        onClick={toggleDropdown}
        onKeyUp={(e) => closeDropdwownWithKeyboard(e)}
        disabled={disabled}
        aria-labelledby={btnId}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        data-testid={btnId}
      >
        <span className={styles.selectValue}>
          {validSelectedValue ? (
            <>
              <span
                className={styles.selectFlag}
                data-testid={`${rfsKey}-selected-flag`}
              >
                {getSelectedFlag()}
              </span>
              {showSelectedLabel && (
                <span className={styles.label}>
                  {isCustomLabelObject(displayLabel)
                    ? (displayLabel as CustomLabel).primary
                    : displayLabel}
                </span>
              )}
              {showSecondarySelectedLabel &&
                isCustomLabelObject(displayLabel) && (
                  <span className={styles.secondaryLabel}>
                    {(displayLabel as CustomLabel).secondary}
                  </span>
                )}
            </>
          ) : (
            <>{placeholder || defaultPlaceholder}</>
          )}
        </span>
      </button>
      {!disabled && isDropdownOpen && ReactDOM.createPortal(
        <ul
          tabIndex={-1}
          role="listbox"
          ref={optionsRef}
          style={{
            fontSize: optionsSize,
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            minWidth: "15em",
            zIndex: 9999,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            margin: 0,
            padding: 0,
            listStyle: "none",
            borderRadius: 4,
            maxHeight: 300,
            overflowY: "auto",
          }}
          className={cx(styles.selectOptions, {
            [styles.selectOptionsWithSearch]: searchable,
            [styles.alignOptionsToRight]: alignOptionsToRight,
            [styles.fullWidthOptions]: fullWidth,
          })}
        >
          {searchable && (
            <div className={styles.filterBox}>
              <input
                type="text"
                name={`${rfsKey}-q`}
                autoComplete="off"
                value={filterValue}
                placeholder={searchPlaceholder || defaultSearchPlaceholder}
                ref={filterTextRef}
                onChange={filterSearch}
                autoFocus
              />
            </div>
          )}
          {(() => {
            const { preferred, rest } = getPreferredAndRest();
            return (
              <>
                {preferred.map((countryCode) => {
                  const countryFlagName = countryCodeToPascalCase(countryCode);
                  const CountryFlag = getFlag(countryFlagName as FlagKey);
                  const countryLabel = getLabel(countryCode);
                  return (
                    <li
                      key={countryCode}
                      id={`${rfsKey}-${countryCode}`}
                      role="option"
                      tabIndex={0}
                      className={cx(styles.selectOption, {
                        [styles.selectOptionWithlabel]: showOptionLabel,
                      })}
                      onClick={() => onOptionSelect(countryCode)}
                      onKeyUp={(e) => onSelectWithKeyboard(e, countryCode)}
                    >
                      <span className={styles.selectOptionValue}>
                        <span className={styles.selectFlag}>
                          <CountryFlag />
                        </span>
                        {showOptionLabel && (
                          <span className={styles.label}>
                            {isCustomLabelObject(countryLabel)
                              ? (countryLabel as CustomLabel).primary
                              : countryLabel}
                          </span>
                        )}
                        {showSecondaryOptionLabel &&
                          isCustomLabelObject(countryLabel) && (
                            <span className={styles.secondaryLabel}>
                              {(countryLabel as CustomLabel).secondary}
                            </span>
                          )}
                      </span>
                    </li>
                  );
                })}
                {preferred.length > 0 && rest.length > 0 && (
                  <li className={styles.preferredSeparator} aria-hidden="true" style={{ borderBottom: "1px solid #eee", margin: "4px 0" }} />
                )}
                {rest.map((countryCode) => {
                  const countryFlagName = countryCodeToPascalCase(countryCode);
                  const CountryFlag = getFlag(countryFlagName as FlagKey);
                  const countryLabel = getLabel(countryCode);
                  return (
                    <li
                      key={countryCode}
                      id={`${rfsKey}-${countryCode}`}
                      role="option"
                      tabIndex={0}
                      className={cx(styles.selectOption, {
                        [styles.selectOptionWithlabel]: showOptionLabel,
                      })}
                      onClick={() => onOptionSelect(countryCode)}
                      onKeyUp={(e) => onSelectWithKeyboard(e, countryCode)}
                    >
                      <span className={styles.selectOptionValue}>
                        <span className={styles.selectFlag}>
                          <CountryFlag />
                        </span>
                        {showOptionLabel && (
                          <span className={styles.label} title={isCustomLabelObject(countryLabel)
                              ? (countryLabel as CustomLabel).primary
                              : countryLabel?.toString()}>
                            {isCustomLabelObject(countryLabel)
                              ? (countryLabel as CustomLabel).primary
                              : countryLabel}
                          </span>
                        )}
                        {showSecondaryOptionLabel &&
                          isCustomLabelObject(countryLabel) && (
                            <span className={styles.secondaryLabel}>
                              {(countryLabel as CustomLabel).secondary}
                            </span>
                          )}
                      </span>
                    </li>
                  );
                })}
              </>
            );
          })()}
        </ul>,
        document.body
      )}
    </div>
  );
};

export default ReactFlagsSelect;
