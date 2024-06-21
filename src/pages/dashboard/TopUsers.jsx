import React, { useEffect } from "react";
import $ from "jquery";
import { Icon, Label, Button, Header, Dimmer, Loader } from "semantic-ui-react";
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
const ActiveTable = (props) => {
  useEffect(() => {
    includeHTML();
  }, []);
  return (
    <>
      <span
        className="activetable "
        w3-include-html="https://galaxy10x.site/lists/topplayers/"
      >
        <Dimmer active>
          <Loader className="farsi-inline">لطفا صبر کنید...</Loader>
        </Dimmer>
      </span>
    </>
  );
};
export default ActiveTable;
