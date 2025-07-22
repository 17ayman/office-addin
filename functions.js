function insertHi(event) {
  Office.context.mailbox.item.body.setSelectedDataAsync("Hi", { coercionType: "html" }, function (result) {
    event.completed();
  });
}
