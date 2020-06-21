function Accordion(containerAcc) {
  this.elAcc = containerAcc;
  this.elAcc.addEventListener("click", this.onclickAccTitle);
  this.activePanel;
}
Accordion.TITLE_CLASS = "title";
Accordion.ACTIVE_CLASS = "active";
Accordion.BODY_ACTIVE_CLASS = "body-active";

Accordion.prototype.onclickAccTitle = function (event) {
  if (event.target.classList.contains(Accordion.TITLE_CLASS)) {
    event.target.classList.add(Accordion.ACTIVE_CLASS);
    event.target.nextElementSibling.classList.add(Accordion.BODY_ACTIVE_CLASS);
    if (this.activePanel) {
      this.activePanel.classList.remove(Accordion.ACTIVE_CLASS);
      this.activePanel.nextElementSibling.classList.remove(
        Accordion.BODY_ACTIVE_CLASS
      );
    }

    this.activePanel = this.activePanel === event.target ? 0 : event.target;
  }
};
