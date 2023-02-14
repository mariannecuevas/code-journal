var $photoUrl = document.querySelector('.photo-url');
var $placeholderImage = document.querySelector('.placeholder-img');
var form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $noEntries = document.querySelector('.no-entries');
var $view = document.querySelectorAll('.view');

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

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title column-full';
  entryTitle.textContent = entry.title;
  entryTitleRow.append(entryTitle);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes column-full';
  entryNotes.textContent = entry.notes;
  entryTitleRow.append(entryNotes);

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
