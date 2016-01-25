module.exports = graph = {};

graph.DirectedGraph = function(){
    this.edgesList = {};
}

graph.DirectedGraph.prototype =  {
    addVertex: function(vertex){
            this.edgesList[vertex] = this.edgesList[vertex] || [];
    },
    addEdge: function(from, to){
            this.addVertex(from);
            this.edgesList[from].push(to);
    },
    hasEdgeBetween: function(from, to, path){
        var path = path || [];
        if(from == to){
            path.push(from);
            return path.length > 0;
        }
        else{
            path.push(from);
            for(var i in this.edgesList[from]){
                return this.hasEdgeBetween(this.edgesList[from][i],to,path);
            }
        }
    },
    pathBetween: function(from, to, path){
        var path = path || [];
		if(from == to){
            return path.concat(from);
        }
		for (var i = 0 in this.edgesList[from]) {
			if(path.indexOf(this.edgesList[from][i]) == -1){
				var sortedPath = this.pathBetween(this.edgesList[from][i], to, path.concat(from));
				if(sortedPath.slice(-1) == to) return sortedPath;
			}
		};
		return [];
    },
    order: function(){
        return Object.keys(this.edgesList).length;
    },
    size: function(){
        var allEdges = this.edgesList;
        var allvertex = Object.keys(this.edgesList);
        return allvertex.filter(function(vertex){
            return allEdges[vertex].length > 0;
        }).length;
    },
    farthestVertex: function(vertex){
    var LongestPathLength = Object.keys(this.edgesList[vertex]).length;
    var farthestVertex = [];
    var edges = Object.keys(this.edgesList);
   for(var i = 0; i<edges.length; i++){
     var vertexMaxPath = this.pathBetween(vertex, edges[i]);
     if(vertexMaxPath.length > LongestPathLength){
       farthestVertex = edges[i];
     }
   };
   return farthestVertex;
 }
}





//--------------------------------------------------------------------------------------------------------//

graph.UndirectedGraph = function(){
    this.edgesList = {};
}

graph.UndirectedGraph.prototype =  {
    addVertex: function(vertex){
            this.edgesList[vertex] = this.edgesList[vertex] || [];
    },
    addEdge: function(from, to){
            this.addVertex(from);
            this.edgesList[from].push(to);
            this.addVertex(to);
            this.edgesList[to].push(from);
    },
    hasEdgeBetween: function(from, to, path){
        var path = path || [];
        if(from == to){
            path.push(from);
            return path.length > 0;
        }
        else{
            path.push(from);
            for(var i in this.edgesList[from]){
                return this.hasEdgeBetween(this.edgesList[from][i],to,path);
            }
        }
    },
    pathBetween: function(from, to, path){
        var path = path || [];
		if(from == to){
            return path.concat(from);
        }
		for (var i = 0 in this.edgesList[from]) {
			if(path.indexOf(this.edgesList[from][i]) == -1){
				var sortedPath = this.pathBetween(this.edgesList[from][i], to, path.concat(from));
				if(sortedPath.slice(-1) == to) return sortedPath;
			}
		};
		return [];
    },
    order: function(){
        return Object.keys(this.edgesList).length;
    },
    size: function(){
      var allEdges = this.edgesList;
      var allvertexLength = Object.keys(this.edgesList).filter(function(vertex){
          return allEdges[vertex].length > 0;
      }).length;
      return allvertexLength && allvertexLength-1 || 0;
    },
    farthestVertex: function(vertex){
    var LongestPathLength = Object.keys(this.edgesList[vertex]).length;
    var farthestVertex = [];
    var edges = Object.keys(this.edgesList);
   for(var i = 0; i<edges.length; i++){
     var vertexMaxPath = this.pathBetween(vertex, edges[i]);
     if(vertexMaxPath.length > LongestPathLength){
       farthestVertex = edges[i];
     }
   };
   return farthestVertex;
 }
}
