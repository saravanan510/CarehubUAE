import React, { useEffect } from "react";

const PaymentPage = ({ response }) => {
  console.log("response", response);
  useEffect(() => {
    if (response?.encRequest && response?.accessCode) {
      const form = document.getElementById("ccavenueForm");
      if (form) {
        form.submit();
      }
    }
  }, [response]);

  return (
    <form
      id="ccavenueForm"
      method="POST"
      action="https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction"
      // action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
    >
      <input
        type="hidden"
        name="encRequest"
        value={response?.encryptedData || ""}
      />
      <input
        type="hidden"
        name="access_code"
        value={response?.accessCode || ""}
      />
      <input type="submit" />
    </form>
  );
};

export default PaymentPage;
