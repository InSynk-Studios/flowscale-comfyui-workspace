import React from "react";
import { Tabs } from "@sinm/react-chrome-tabs";
import "@sinm/react-chrome-tabs/css/chrome-tabs.css";
import "@sinm/react-chrome-tabs/css/chrome-tabs-dark-theme.css";

type Tab = {
  id: string;
  title: string;
  favicon?: string;
  active: boolean;
};

type WorkflowTabsProps = {
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
};

export default function WorkflowTabs({ tabs, setTabs }: WorkflowTabsProps) {
  const active = (id: string) => {
    const selectedTab = tabs.find((tab) => tab.id === id);
    if (selectedTab && selectedTab.active) {
      return; // Do nothing if the tab is already active
    }
    setTabs(tabs.map((tab) => ({ ...tab, active: id === tab.id })));
  };

  const close = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const reorder = (tabId: string, fromIndex: unknown, toIndex: number) => {
    const beforeTab = tabs.find((tab) => tab.id === tabId);
    if (!beforeTab) {
      return;
    }
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  };

  return (
    <Tabs
      darkMode={true}
      onTabClose={close}
      onTabReorder={reorder}
      onTabActive={active}
      tabs={tabs}
      className="bg-[#16191D]"
    />
  );
}
