const graphql = require('graphql');

const categories = [{
    id: "1", name: "图书",
    id: "2", name: "数码",
    id: "3", name: "食品"
}];

const products = [{
    id: 1, name: "红楼梦", category: '1'
},{ 
    id: 2, name: "Apple", category: '2'
}]

const { 
    GraphQLScalarType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
 } = graphql;

const Category = new GraphQLScalarType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphqlString },
        name: { type: GraphqlString },
        products: { 
            type: GraphQLList, 
            resolve(parent) {
                return products.filter(item => item.id == parent.id)
            }
        }
    })
});

const Product = new GraphQLScalarType({
    name: "Product",
    fileds: {
        id: { type: GraphqlString },
        name: { type: GraphqlString },
        category: { 
            type: Category,
            resolve(parent, args) {
                return categories
            }
        }
    }
})

const RootQuery = new GraphQLScalarType({
    name: "RootQuery",
    fields: {
        getCategory: { 
            type: Category
        },
        getCategories: { 
            type: GraphQLList,
            args: {},
            resolve(parent, args) {

            }
        },

        args: {
            id: { 
                type: new GraphQLNonNull(GraphqlString)
             }
        },
        resolve(parent, args) {
            return categories.find((item) => item.id == args.id);
        }
    }
});


const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fileds: {
        addCategory: { 
            type: Category,
            args: {
                name: { type: new GraphQLNonNull(GraphqlString) }
            },
            resolve(parent, args){
                args.id = categories.length + 1;
                categories.push(args);
                return args;
            }
        }
    }
})


module.exports = new GraphQLSchema({
  RootQuery
});