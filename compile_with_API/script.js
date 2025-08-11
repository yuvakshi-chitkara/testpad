document.getElementById("compileBtn").addEventListener("click", function () {
    const code = document.getElementById("codeEditor").value.trim();
    const langId = document.getElementById("language").value;
    const outputConsole = document.getElementById("outputConsole");

    if (!code) {
        outputConsole.textContent = "Error: Please enter some code!";
        return;
    }

    outputConsole.textContent = "Submitting code...";

    // Step 1: Send POST request to submit code
    fetch("https://codequotient.com/api/executeCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, langId: langId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            outputConsole.textContent = "Error: " + data.error;
        } else {
            const codeId = data.codeId;
            outputConsole.textContent = "Code submitted. Waiting for result...";

            // Step 2: Polling to get results
            const intervalId = setInterval(() => {
                fetch(`https://codequotient.com/api/codeResult/${codeId}`)
                .then(res => res.json())
                .then(result => {
                    if (result.data && Object.keys(result.data).length > 0) {
                        clearInterval(intervalId);
                        if (result.data.errors) {
                            outputConsole.textContent = "Errors:\n" + result.data.errors;
                        } else {
                            outputConsole.textContent = "Output:\n" + result.data.output;
                        }
                    }
                })
                .catch(err => {
                    clearInterval(intervalId);
                    outputConsole.textContent = "Error fetching results.";
                });
            }, 2000); // Poll every 2 seconds
        }
    })
    .catch(error => {
        outputConsole.textContent = "Error: " + error.message;
    });
});
