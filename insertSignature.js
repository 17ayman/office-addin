Office.initialize = function () {};

function insertSignature(event) {
    Office.context.mailbox.item.body.setSelectedDataAsync(
        `<div style="font-family: Arial; font-size: 12px;">
            <p>Best regards,<br>
            <strong>John Doe</strong><br>
            Company Name<br>
            <a href="https://company.com">company.com</a></p>
        </div>`,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            event.completed();
        }
    );
}
