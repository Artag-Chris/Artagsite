  // Handle resume download
  export const handleResumeDownload = () => {
    // Track the download
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'cv_download',
        location: 'header',
        locale: document.documentElement.lang || 'en',
        file_name: 'Christian_Resume.pdf',
      })
    }

    // Create a link to your resume PDF
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Path to your resume PDF in the public folder
    link.download = "Christian_Resume.pdf" // Name for the downloaded file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }