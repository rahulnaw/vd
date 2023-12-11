document.addEventListener("DOMContentLoaded", function () {
    // Replace "YOUR_API_SECRET_KEY" and "VIDEO_ID" with your VdoCipher API secret key and video ID
    const apiSecretKey = "rAJ0b4D8snjx8zSLc6MArhRpRnkhCXyJzWQUEf689ppBbxSLMCpsIZyDclNqkftu";
    const videoId = "1fdf6a21d9594c5ebc2e4aef345af8de";

    // Step 1: HTTP request to obtain OTP
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Apisecret ${apiSecretKey}`
        },
        body: JSON.stringify({ ttl: 300 }),
    };

    fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Step 2: Use OTP and playbackInfo in embed code
            const otp = data.otp;
            const playbackInfo = data.playbackInfo;

            // Create the iframe structure
            const iframe = document.createElement("iframe");
            iframe.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
            iframe.style.border = "0";
            iframe.style.width = "720px";
            iframe.style.height = "405px";
            iframe.allow = "encrypted-media";
            iframe.allowFullscreen = true;

            // Create the container div and append the iframe
            const containerDiv = document.createElement("div");
            containerDiv.style.position = "relative";
            containerDiv.style.paddingBottom = "56.25%"; // Aspect ratio 16:9
            containerDiv.appendChild(iframe);

            // Append the container div to the player div
            document.getElementById("vdoCipherPlayer").appendChild(containerDiv);
        })
        .catch(error => console.error("Error fetching VdoCipher OTP:", error));
});
