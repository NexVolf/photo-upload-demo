// Upload photo
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    alert('Photo uploaded successfully!');
    document.getElementById('uploadForm').reset();
    loadPhotos();
  } else {
    alert('Error uploading photo: ' + result.message);
  }
});

// Load all photos
async function loadPhotos() {
  const response = await fetch('/photos');
  const photos = await response.json();
  const photosGrid = document.getElementById('photos');
  photosGrid.innerHTML = '';

  if (photos.length === 0) {
    photosGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-secondary);">No photos uploaded yet. Be the first to add one!</p>';
    return;
  }

  photos.forEach(photo => {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    const photoName = photo.path.split(/[/\\]/).pop();
    const imgSrc = `/uploads/${photoName}`;
    
    // Add click event to navigate to preview page
    photoCard.onclick = () => {
      const params = new URLSearchParams({
        src: imgSrc,
        date: photo.datetime,
        desc: photo.description
      });
      window.location.href = `preview.html?${params.toString()}`;
    };

    photoCard.innerHTML = `
      <img src="${imgSrc}" alt="${photo.description}" loading="lazy">
      <div class="photo-info">
        <p class="datetime">${new Date(photo.datetime).toLocaleDateString()}</p>
        <p class="desc">${photo.description}</p>
      </div>
    `;
    photosGrid.appendChild(photoCard);
  });
}

// Load photos on page load
loadPhotos();
