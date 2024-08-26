document.getElementById('expression-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const expression = document.getElementById('expression').value;

    fetch('/evaluate', {  // Call the Firebase function directly via its endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Use JSON for serverless function
        },
        body: JSON.stringify({ expression })    // Send the expression as JSON
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('evaluation-result').innerText = `The result of the expression is: ${data.result}`;
        // Additional code can go here to visualize the tree, if needed
    })
    .catch(error => console.error('Error:', error));
});
