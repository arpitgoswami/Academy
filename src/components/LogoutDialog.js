"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

export default function LogoutDialog({ isOpen, onClose, onLogout }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-900 p-6 text-left shadow-xl shadow-slate-200/20 dark:shadow-slate-900/30 transition-all">
                <div className="space-y-2">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-slate-900 dark:text-white"
                  >
                    Sign Out
                  </DialogTitle>
                  <Description className="text-slate-600 dark:text-slate-400">
                    Are you sure you want to sign out of your account?
                  </Description>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    Sign Out
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
