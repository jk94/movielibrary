import { Component, ViewChild } from '@angular/core';

import { SettingsPage } from "../settings/settings";
import { ListPage } from "../list/list";
import { HomePage } from "../home/home";
import { Keyboard } from "@ionic-native/keyboard";
import { Platform, Tabs } from "ionic-angular";

@Component({
             templateUrl : 'tabs.html'
           })
export class TabsPage {

  searchTab   = HomePage;
  listTab     = ListPage;
  settingsTab = SettingsPage;

  @ViewChild(Tabs) tabs: Tabs;

  constructor(private keyboard: Keyboard,
              platform: Platform) {
    platform.ready().then(() => {
      this.keyboard.onKeyboardShow().subscribe(() => {
        this.tabs._tabbar.nativeElement.style.display = 'none';
        this.tabs.resize();
      });
      this.keyboard.onKeyboardHide().subscribe(() => {
        this.tabs._tabbar.nativeElement.style.display = 'flex';
        this.tabs.resize();
      })
    })
  }
}
