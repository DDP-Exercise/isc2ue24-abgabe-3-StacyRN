document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    
    const fullImage = document.querySelector('#fullImage');
    const notes = document.querySelector('#notes');
    const thumbnails = document.querySelectorAll('#thumbnails');
    
    
    
    /**
     * Selects a random full image at the start and displays it.
     */
    function showRandomImageAtStart() {
        // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    
        // TODO: Select a random entry out of these 6.
        const randomIndex = getRandomInt(0, thumbnails.length);
        const randomLink = thumbnails[randomIndex];
    
        // TODO: Implement switchFullImage() below.
        // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
        switchFullImage(randomLink.href, randomLink.querySelector('img').alt);
    
        // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
        const parentElement = randomLink.parentElement;
    
        const cardBody = parentElement.querySelector('.card-body');
    
        cardBody.classList.add('bg-dark', 'text-white');
    }
    
    /**
     * Prepare the links on the full images so that they execute the following tasks:
     * - Switch the full image to the one that has been clicked on.
     * - Set the highlight under the current thumbnail.
     * - Load the notes for the current image.
     */
    // Iterate over each thumbnail link
    thumbnails.forEach(link => {
        // Add a click event listener
        link.addEventListener('click', function(event) {
            // Prevent the default link click behavior
            event.preventDefault();
    
            // TODO: Switch the full image to the one that has been clicked on
            const imageUrl = link.href;
            const altText = link.querySelector('img').alt;
            switchFullImage(imageUrl, altText);
    
            // TODO: Set the highlight under the current thumbnail
            // Remove the class 'highlighted' from previously highlighted link
            document.querySelector('#thumbnails a.highlighted')?.classList.remove('highlighted');
    
            // Add the class 'highlighted' to the clicked link
            link.classList.add('highlighted');
    
            // TODO: Load the notes for the current image
            loadNotes(imageUrl);
        });
    });
    function prepareLinks() {
        // TODO: Select all the 6 links (<a>) in the thumbnail section.
    
        // TODO: Set an event listener for the click event on every <a> element.
        //  (or advanced: think of a way to do it with one single handler)
        thumbnails.forEach(link => {
            link.addEventListener('click', function(event) {
                // TODO: Prevent the default action for the link (we don't want to follow it).
                event.preventDefault();
    
        // TODO: The callback of the listener should do the following things:
        //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
                const previousCard = document.querySelector('.card.bg-dark.text-white');
                if(previousCard) {
                    previousCard.classList.remove('bg-dark', 'text-white');
                }
        //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
                const currentCard = this.closest('.card');
                if(currentCard) {
                    currentCard.classList.add('bg-dark', 'text-white');
                }
        //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
                const imageUrl = link.href;
                const altText = link.querySelector('img').alt;
                switchFullImage(imageUrl, altText);
    
        //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
                loadNotes(imageUrl);
    
                //  - Prevent the default action for the link (we don't want to follow it).
            });
        });
    }
    
    /**
     * Stores or deletes the updated notes of an image after they have been changed.
     */
    function storeNotes() {
        // Add a blur listener to the single notes field
        notes.addEventListener('blur', function() {
            // Choose an appropriate key
            const key = fullImage.src;
    
            if (notes.value.trim() === '') {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, notes.value);
            }
        });
    }
    
    /**
     * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
     * attribute and the figure's caption.
     * @param {string} imageUrl The URL to the new image (the image's src attribute value).
     * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
     */
    function switchFullImage(imageUrl, imageDescription) {
        // TODO: Get the <img> element for the full image. Select it by its class or tag name.
        const fullImgElement = document.querySelector('#fullImage');
    
        // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
        fullImgElement.src = imageUrl;
        fullImgElement.alt = imageDescription;
    
        // TODO: Select the <figcaption> element.
        const figcapElement = document.querySelector('figcaption');
    
        // TODO: Set the description (the one you used for the alt attribute) as its text content.
        figcapElement.textContent = imageDescription;
    }
    
    /**
     * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
     * @param {string} key The key in local storage where the entry is found.
     */
    function loadNotes(key) {
        // Select the notes field.
        const notesField = document.querySelector('#notes');
    
        // Check the local storage at the provided key.
        let notesContent = localStorage.getItem(key);
        if (!notesContent) {
            notesContent = "Enter your notes here!";
        }
        notesField.innerHTML = notesContent;
    }
    
    /**
     * Returns a random integer value between min (included) and max (excluded).
     * @param {number} min The minimum value (included).
     * @param {number} max The maximum value (excluded).
     * @returns {number} A random integer value between min (included) and max (excluded).
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    /**
     * Gets the whole thing started.
     */
    showRandomImageAtStart();
    prepareLinks();
    storeNotes();
    });
    