document.getElementById('expression-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const expression = document.getElementById('expression').value;

    fetch('evaluate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `expression=${encodeURIComponent(expression)}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('evaluation-result').innerText = `The result of the expression is: ${data.result}`;
        // You can add code here to visualize the tree
    })
    .catch(error => console.error('Error:', error));
});
