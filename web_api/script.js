document.getElementById("githubForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    const username = document.getElementById("username").value.trim();
    const repoList = document.getElementById("repoList");

    if (!username) {
        alert("Please enter a GitHub username");
        return;
    }

    // Clear previous results
    repoList.innerHTML = "<li>Loading...</li>";

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        })
        .then(data => {
            repoList.innerHTML = "";
            if (data.length === 0) {
                repoList.innerHTML = "<li>No repositories found</li>";
                return;
            }

            data.forEach(repo => {
                const li = document.createElement("li");
                const link = document.createElement("a");
                link.href = repo.html_url;
                link.target = "_blank";
                link.textContent = repo.name;
                li.appendChild(link);
                repoList.appendChild(li);
            });
        })
        .catch(error => {
            repoList.innerHTML = `<li style="color:red;">${error.message}</li>`;
        });
});
