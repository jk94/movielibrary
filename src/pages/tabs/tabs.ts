import { Component } from '@angular/core';

import { SearchPage } from "../search/search";
import { SettingsPage } from "../settings/settings";
import { ListPage } from "../list/list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchTab   = SearchPage;
  listTab     = ListPage;
  settingsTab = SettingsPage;


  constructor() {

  }
}
