// Create cards
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__actions,  .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
    //return new mdc.ripples.MDCRipple(el);
});