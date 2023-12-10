"use client";

import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from '@heroicons/react/solid'
import { DocumentPlusIcon, FolderPlusIcon, FolderIcon, HashtagIcon, TagIcon } from '@heroicons/react/outline'

import WalletInput from "./WalletInput";
import { classNames } from "./Utils";

const projects = [
  { id: 1, name: "Workflow Inc. / Website Redesign", url: "#" },
  // More projects...
];
const recent = [projects[0]];
const quickActions = [
  { name: "Add new file...", icon: DocumentPlusIcon, shortcut: "N", url: "#" },
  { name: "Add new folder...", icon: FolderPlusIcon, shortcut: "F", url: "#" },
  { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
  { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
];

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        href="/"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative inline-block w-10 cursor-pointer md:w-1/3"
      >
        <picture>
          {/* Mobile logo: shown on screens smaller than 768px */}
          <source
            media="(max-width: 767px)"
            srcSet="/helius-logos/mobile-logo.svg"
          />

          {/* Default logo: shown on larger screens */}
          <img
            src="/helius-logos/desktop-logo.svg"
            alt="Helius Logo"
            className={`transition-opacity duration-200 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/helius-logos/desktop-logo-hover.svg"
            alt="Helius Hover Logo"
            className={`absolute left-0 top-0 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      </a>
    </>
  );
};

const HeliusForwardLink = ({ className }: { className: string; }) => {
  return (
    <>
      <div className="group">
        <a
          href="https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "flex h-[30px] items-center rounded-full border border-white border-opacity-20 bg-opacity-25 px-3 transition-all duration-200 ease-in-out hover:bg-black/25 group-hover:border-opacity-60 group-hover:bg-opacity-75",
            className,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 opacity-70 transition-all duration-200 ease-in-out group-hover:opacity-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>

          <span className="ml-2 text-sm font-light text-white opacity-70 transition-all duration-200 ease-in-out group-hover:opacity-100">
            Powered by Helius DAS API
          </span>
        </a>
      </div>
    </>
  );
};

const MenuDropdown = ({ className }: { className: string }) => {
  const menuOptions = [
    { name: "Tokens", href: "#" },
    { name: "NFTs", href: "#" },
  ];

  return (
    <>
      <Menu as="div" className={classNames("relative ml-3", className)}>
        <div>
          <Menu.Button className="relative flex text-sm">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open dropdown menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    href={option.href}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

const SearchButton = () => {
  return (
    <button className="hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  );
};

const SearchModal = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(true);

  const filteredProjects =
    query === ''
      ? []
      : projects.filter((project) => {
        return project.name.toLowerCase().includes(query.toLowerCase())
      });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                  >
                    <li className="p-2">
                      {query === "" && (
                        <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-900">
                          Recent searches
                        </h2>
                      )}
                      <ul className="text-sm text-gray-700">
                        {(query === "" ? recent : filteredProjects).map(
                          (project) => (
                            <Combobox.Option
                              key={project.id}
                              value={project}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                  active &&
                                  "bg-gray-900 bg-opacity-5 text-gray-900",
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={classNames(
                                      "h-6 w-6 flex-none text-gray-900 text-opacity-40",
                                      active && "text-opacity-100",
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {project.name}
                                  </span>
                                  {active && (
                                    <span className="ml-3 flex-none text-gray-500">
                                      Jump to...
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ),
                        )}
                      </ul>
                    </li>
                    {query === "" && (
                      <li className="p-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-700">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                  active &&
                                  "bg-gray-900 bg-opacity-5 text-gray-900",
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={classNames(
                                      "h-6 w-6 flex-none text-gray-900 text-opacity-40",
                                      active && "text-opacity-100",
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {action.name}
                                  </span>
                                  <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">
                                      {action.shortcut}
                                    </kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" && filteredProjects.length === 0 && (
                  <div className="px-6 py-14 text-center sm:px-14">
                    <FolderIcon
                      className="mx-auto h-6 w-6 text-gray-900 text-opacity-40"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      We couldn&apos;t find any projects with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const NavBar = () => {
  const [displaySearchModal, setDisplaySearchModal] = useState(false);

  return (
    <>
      <nav className="flex w-full items-center justify-between bg-black bg-opacity-50 px-4 py-4 sm:px-10 md:h-20">
        <div className="flex items-center">
          <Logo />
          <HeliusForwardLink className="ml-6" />
        </div>

        <div className="flex items-center">
          <SearchButton />
          <MenuDropdown className="ml-6" />
        </div>
        {/* <WalletInput source={"navBar"} /> */}
      </nav>
    </>
  );
};

export default NavBar;
