document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ageForm');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const yearsOutput = document.getElementById('yearsValue');
    const monthsOutput = document.getElementById('monthsValue');
    const daysOutput = document.getElementById('daysValue');
    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous errors
        dayError.textContent = '';
        monthError.textContent = '';
        yearError.textContent = '';

        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);

        const today = new Date();
        const inputDate = new Date(year, month - 1, day);

        // Validate the date
        if (!day || !month || !year) {
            if (!day) dayError.textContent = 'Day is required';
            if (!month) monthError.textContent = 'Month is required';
            if (!year) yearError.textContent = 'Year is required';
            return;
        }

        if (day < 1 || day > 31) {
            dayError.textContent = 'Day must be between 1 and 31';
            return;
        }

        if (month < 1 || month > 12) {
            monthError.textContent = 'Month must be between 1 and 12';
            return;
        }

        if (inputDate > today) {
            dayError.textContent = 'Date cannot be in the future';
            return;
        }

        if (inputDate.getDate() !== day || inputDate.getMonth() + 1 !== month || inputDate.getFullYear() !== year) {
            dayError.textContent = 'Invalid date';
            return;
        }

        // Calculate age
        const ageDifMs = today - inputDate;
        const ageDate = new Date(ageDifMs);

        const years = Math.abs(ageDate.getUTCFullYear() - 1970);
        const months = Math.abs(ageDate.getUTCMonth());
        const days = Math.abs(ageDate.getUTCDate() - 1);

        // Display results with animation
        yearsOutput.textContent = '0';
        monthsOutput.textContent = '0';
        daysOutput.textContent = '0';

        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        };

        animateValue(yearsOutput, 0, years, 1000);
        animateValue(monthsOutput, 0, months, 1000);
        animateValue(daysOutput, 0, days, 1000);
    });
});
