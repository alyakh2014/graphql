const graphql = require('graphql');

const {GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList} = graphql;

const movies = [
    {id: '1', name: 'Pulp Fiction',genre: 'Crime', directorId: 1},
    {id: '2', name: '1984',genre: 'Sci-Fi', directorId: 2},
    {id: 3, name: 'V for vendetta',genre: 'Sci-Fi-Triller', directorId: 3},
    {id: '4', name: 'Snatch',genre: 'Crime-Comedy', directorId: 4},
    {id: '5', name: 'Reservoir Dogs',genre: 'Crime', directorId: 1},
    {id: '6', name: 'The Hateful Eight',genre: 'Sci-Fi', directorId: 1},
    {id: 7, name: 'Inglourious Basterds',genre: 'Sci-Fi-Triller', directorId: 1},
    {id: 8, name: 'Lock, Stock and Two Smoking Barrels',genre: 'Crime-Comedy', directorId: 4},
];

const directors = [
    {id: '1', name: 'Quentin Tarantino', age: 55},
    {id: '2', name: 'Michael Radford', age: 72},
    {id: '3', name: 'James McTiegue', age: 51},
    {id: '4', name: 'Guy Ritchie', age: 50},
];

//new schema
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director:{
            type:DirectorType,
            resolve(parent, args){
                return directors.find(director => director.id == parent.id)
            }
        },
    }),
});

//new schema
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies:{
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies.filter(movie => movie.directorId == parent.id)
            }
        }
    }),
});

//New object query. It's a main query with inside other queries
//Here is one sub-query is 'movie'
const Query = new GraphQLObjectType({
    name: 'Query',
    fields:{
        movie: { //sub-query
            type: MovieType, //type of sub-query
            args: {id: {type: GraphQLID}}, // arguments which are expected to be on entrance
            resolve(parent, args){ //method with 2 arguments and inside we write algorizm of returning data
                return movies.find(movie => movie.id == args.id);
            },
        },
        director: { //sub-query
            type: DirectorType, //type of sub-query
            args: {id: {type: GraphQLID}}, // arguments which are expected to be on entrance
            resolve(parent, args){ //method with 2 arguments and inside we write algorizm of returning data
                return directors.find(director => director.id == args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors;
            }
        }
    }
});

//Make an export of our root request
module.exports = new GraphQLSchema({
    query: Query,
});