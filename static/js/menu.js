// Listens for mouse click, and then asks if the click target has data-dropdown-button
document.addEventListener('click', e => {
    const isDropdownbutton = e.target.matches('[data-dropdown-button]')
    // If the click is inside dropdown, program returns
    if (!isDropdownbutton && e.target.closest('[data-dropdown]') != null) return

    let currentDropdown
    // Program changes dropdown button class to .active
    if (isDropdownbutton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }
    // Removes all .active classes outside of the current active class
    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})