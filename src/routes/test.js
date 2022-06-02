let films = [{
    'id': 1,
    'name': 'The Shining'},
    {
    'id': 2,
    'name': 'Incendies'},
    {
    'id': 3,
    'name': 'Rang de Basanti'},
    {
    'id': 4,
    'name': 'Finding Nemo'}
]

let getId = 3;
if(getId<films.length+1)
{
    films.forEach(x => {
        if(x.id === getId)
        {
            console.log(x)
        }
    })
}
else
{
    console.log("No movie exists with the id "+getId)
}
