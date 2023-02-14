var $photoUrl = document.querySelector('.photo-url');
var $placeholderImage = document.querySelector('.placeholder-img');
var form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $noEntries = document.querySelector('.no-entries');
var $view = document.querySelectorAll('.view');
var $titleInput = document.querySelector('.title-input');
var $notesInput = document.querySelector('.notes-input');
var $formTitle = document.querySelector('.formTitle');

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
  $entryList.prepend(renderEntry(entryData));
  viewSwap('entries');
  if (data.entries.length === 0) {
    toggleNoEntries();
  } else {
    toggleEntries();
  }
  form.reset();
});

function renderEntry(entry) {
  var entryListChild = document.createElement('li');
  entryListChild.className = 'entry row';

  var colHalf = document.createElement('div');
  colHalf.className = 'column-half';
  entryListChild.append(colHalf);

  var entryImg = document.createElement('img');
  entryImg.className = 'entry-img';
  entryImg.setAttribute('src', entry.photoUrl);
  entryImg.setAttribute('alt', 'Entry Image');
  colHalf.append(entryImg);

  var colHalfTwo = document.createElement('div');
  colHalfTwo.className = 'column-half';
  entryListChild.appendChild(colHalfTwo);

  var entryTitleRow = document.createElement('div');
  entryTitleRow.className = 'row';
  colHalfTwo.append(entryTitleRow);

  var titleRowHalf = document.createElement('div');
  titleRowHalf.className = 'row-half';
  entryTitleRow.append(titleRowHalf);

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title';
  entryTitle.textContent = entry.title;
  titleRowHalf.append(entryTitle);

  var titleRowHalfTwo = document.createElement('div');
  titleRowHalfTwo.className = 'row-half right-end edit-button';
  entryTitleRow.append(titleRowHalfTwo);

  var editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pencil';
  titleRowHalfTwo.append(editIcon);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes column-full';
  entryNotes.textContent = entry.notes;
  entryTitleRow.append(entryNotes);

  entryListChild.setAttribute('data-entry-id', entry.entryId);
  return entryListChild;
}

function toggleNoEntries() {
  $noEntries.className = 'view no-entries';
}

function toggleEntries() {
  $noEntries.className = 'hidden no-entries';
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntries = renderEntry(data.entries[i]);
    $entryList.append(renderedEntries);
  }
  viewSwap(data.view);
  if (data.entries.length > 0) {
    toggleEntries();
  } else {
    toggleNoEntries();
  }
});

function viewSwap(view) {
  for (var i = 0; i < $view.length; i++) {
    var currentView = $view[i].getAttribute('data-view');
    if (currentView === view) {
      $view[i].className = 'view';
      data.view = view;
    } else {
      $view[i].className = 'hidden';
    }
  }
}

document.addEventListener('click', function (event) {
  var dataView = event.target.getAttribute('data-view');
  if (dataView === null) {
    return;
  }
  if (dataView === 'entries') {
    viewSwap('entries');
  } else {
    viewSwap('entry-form');
  }
});

$entryList.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
  }
  var entryListLi = event.target.closest('li');
  data.editing = entryListLi;

  var entryId = entryListLi.getAttribute('data-entry-id');

  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var currentEntry = data.entries[i];
      $titleInput.value = currentEntry.title;
      $photoUrl.value = currentEntry.photoUrl;
      $placeholderImage.setAttribute('src', currentEntry.photoUrl);
      $notesInput.value = currentEntry.notes;
    }
  }
  $formTitle.textContent = 'Edit Entry';
});
