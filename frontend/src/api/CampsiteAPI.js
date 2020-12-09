const fetchCampsiteByID = (campsiteID) => {
  return fetch(`http://localhost:8000/campground/campsites/${campsiteID}`)
    .then((response) => response.json())
}

const fetchCampsites = () => {
  return fetch(`http://localhost:8000/campground/campsites`)
    .then((response) => response.json())
}

export default {
  fetchCampsiteByID,
  fetchCampsites
}