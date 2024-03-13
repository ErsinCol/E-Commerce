export function formatDate(date){
    return new Date(date).toLocaleDateString("tr-TR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}