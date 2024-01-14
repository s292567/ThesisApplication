import React from 'react';

class FileDownloadButton extends React.Component {
    downloadFile = () => {
        // Replace 'your_token_here' with the actual authentication token
        const jwt = localStorage.getItem("ROCP_token");
        return jwt ? jwt.substring(1, jwt.length - 1) : null;

        // Replace {id} with the actual file ID
        const fileId = '6d63e557-b2cc-4ee1-a504-47a3cfe567fa';

        // Replace 'http://localhost:8081/API/downloadFile/' with your actual API endpoint
        const apiUrl = `http://localhost:8081/API/downloadFile/${fileId}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Get the content disposition header to determine the file name
                const contentDisposition = response.headers.get('Content-Disposition');
                const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

                // Use the filename from the header or a default name
                const filename = filenameMatch ? filenameMatch[1] : `downloaded_file_${fileId}`;

                // Convert the response to a blob and create a download link
                return response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    render() {
        return (
            <button onClick={this.downloadFile}>Download File</button>
        );
    }
}

export default FileDownloadButton;