var $photoUrl = document.querySelector('.photo-url');
var $placeholderImage = document.querySelector('.placeholder-img');
var form = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  var updateImgUrl = event.target.value;
  if ($photoUrl.value === '') {
    $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $placeholderImage.setAttribute('src', updateImgUrl);
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entryData = {};
  entryData.title = form.elements.title.value;
  entryData.photoUrl = form.elements.photoUrl.value;
  entryData.notes = form.elements.notes.value;
  entryData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryData);
  $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
});
