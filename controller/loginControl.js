$(document).ready(function () {
    $("#loginForm").on("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const validEmail = "mmalith520@gmail.com"; // Replace with your actual email
        const validPassword = "123"; // Replace with your actual password

        let email = $("#exampleInputEmail1").val().trim();
        let pass = $("#exampleInputPassword1").val().trim();

        // Check credentials
        if (email === validEmail && pass === validPassword) {
            // On successful login
            $("#loginDiv").hide(); // Hide the login form
            $("#homeDiv").show(); // Show the home page
            $("#header").show(); // Show the header

        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});


$("#logoutButton").click(function () {
    location.reload();
});


const emailRegexMethod = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

