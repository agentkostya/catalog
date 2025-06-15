document.addEventListener('DOMContentLoaded', function() {
    const propertyCards = document.querySelectorAll('.property-card');
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const roomsFilter = document.getElementById('rooms-filter');
    const areaFilter = document.getElementById('area-filter');
    const resetBtn = document.getElementById('reset-filters');

    // Обновление значения цены
    priceFilter.addEventListener('input', function() {
        const price = parseInt(priceFilter.value).toLocaleString('ru-RU');
        priceValue.textContent = ${price} ₽;
        filterProperties();
    });

    // Фильтрация при изменении параметров
    [typeFilter, priceFilter, roomsFilter, areaFilter].forEach(filter => {
        filter.addEventListener('change', filterProperties);
    });
    areaFilter.addEventListener('input', filterProperties);

    // Сброс фильтров
    resetBtn.addEventListener('click', function() {
        typeFilter.value = 'all';
        priceFilter.value = '50000000';
        priceValue.textContent = '50 000 000 ₽';
        roomsFilter.value = 'all';
        areaFilter.value = '';
        filterProperties();
    });

    // Основная функция фильтрации
    function filterProperties() {
        const selectedType = typeFilter.value;
        const maxPrice = parseInt(priceFilter.value);
        const selectedRooms = roomsFilter.value;
        const minArea = parseInt(areaFilter.value) || 0;

        propertyCards.forEach(card => {
            const cardType = card.dataset.type;
            const cardPrice = parseInt(card.dataset.price);
            const cardRooms = parseInt(card.dataset.rooms);
            const cardArea = parseInt(card.dataset.area);

            const typeMatch = selectedType === 'all' || cardType === selectedType;
            const priceMatch = cardPrice <= maxPrice;
            const roomsMatch = selectedRooms === 'all' || 
                (selectedRooms === '1' && cardRooms === 1) ||
                (selectedRooms === '2' && cardRooms === 2) ||
                (selectedRooms === '3' && cardRooms >= 3);
            const areaMatch = cardArea >= minArea;

            if (typeMatch && priceMatch && roomsMatch && areaMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});