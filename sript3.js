document.getElementById("ttt").addEventListener("click", function(event) {
    event.preventDefault(); // prevent default form submission
    setTimeout(function() {
      window.location.href = "next_page.html"; // redirect after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  });