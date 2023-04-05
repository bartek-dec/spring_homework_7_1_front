const years = [];
const min = 1900;
const max = new Date().getFullYear();

for (let i = 0; i <= max - min; i++) {
    years[i] = min + i;
}

export default years.reverse();