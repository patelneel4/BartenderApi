class Drink{
    constructor(id, name, description, ingredients =[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;

    }
}
module.exports = Drink;