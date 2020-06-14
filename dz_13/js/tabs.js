class Tabset {
  static ACTIVE_CLASS = "active";
  static TITLE_CLASS = "title";
  static TAB_WRAP_CLASS = "tab-wrap";
  static TAB_CONTENT_CLASS = "tab-content";

  constructor(containerTab) {
    this.elTab = containerTab;
    this.activeTabTitle;
    this.activeTabBody;
    this.initTabs();
  }

  initTabs() {
    this.initClasses();

    this.wrapperСreationBody();

    this.activeСlassSearch();

    this.activeTabContent(this.activeTabBody);

    this.elTab.addEventListener("click", this.onclickTabTitle.bind(this));

    this.elTab.append(this.tabContent);
  }

  initClasses() {
    Array.prototype.forEach.call(this.elTab.children, (el) =>
      el.classList.add(Tabset.TAB_WRAP_CLASS)
    );
  }

  wrapperСreationBody() {
    this.tabContent = document.createElement("div");
    this.tabContent.classList.add(Tabset.TAB_CONTENT_CLASS);
  }

  onclickTabTitle(event) {
    if (event.target.classList.contains(Tabset.TITLE_CLASS)) {
      this.classChange(event.target);
      this.activeTabContent(event.target.nextElementSibling.innerHTML);
    }
  }
  classChange(el) {
    this.activeTab.classList.remove(Tabset.ACTIVE_CLASS);
    this.activeTab = el;
    this.activeTab.classList.add(Tabset.ACTIVE_CLASS);
  }

  activeСlassSearch() {
    this.activeTab = this.elTab.querySelector(`.${Tabset.ACTIVE_CLASS}`);
    this.activeTabBody = this.elTab.querySelector(
      `.${Tabset.ACTIVE_CLASS}`
    ).nextElementSibling.innerHTML;
  }

  activeTabContent(content) {
    this.tabContent.innerHTML = content;
  }
}
