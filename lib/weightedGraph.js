module.exports = graphs = {};

graphs.WeightedGraph = function(){
  this.edgesList = {};
}

graphs.WeightedGraph.prototype = {
  addVertex: function(vertex){
    this.edgesList[vertex] = this.edgesList[vertex] || {};
  },
  addEdge: function(edge){
    this.addVertex(edge.from);
    if(!this.edgesList[edge.from][edge.to] || this.edgesList[edge.from][edge.to].weight > edge.weight){
      this.edgesList[edge.from][edge.to] = edge;
    }
  },
  shortestPath: function(from, to){
    var path = [];
    var vertices = Object.keys(this.edgesList);
    var parent  = setInitial(vertices);
    var weight = setInitial(vertices,from);
    var edges = this.edgesList;
    for (var j in vertices) {
      var vertexWithShortestDistance = shortestDistance(weight);
      var linkedPointsTo = this.edgesList[vertexWithShortestDistance];
      for (var i in linkedPointsTo){
        if(weight[vertexWithShortestDistance] + linkedPointsTo[i].weight < weight[linkedPointsTo[i].to]){
              weight[linkedPointsTo[i].to] = weight[from] + weight[vertexWithShortestDistance] + linkedPointsTo[i].weight;
              parent[linkedPointsTo[i].to] = vertexWithShortestDistance;
        }
      };
      weight[vertexWithShortestDistance] = undefined;
    }
    var shortestPath = getShortestPath(from, to, parent);
    for (var i = 0; i < shortestPath.length; i++) {
      if(shortestPath[i+1] != undefined)
        path.push(this.edgesList[shortestPath[i]][shortestPath[i+1]]);
    }
    return path;
  }
}

var getShortestPath = function(from, to, parent){
  var path = [];
  for(var i in parent){
    if(to == from){return reverse(path.concat(from))}
    path = path.concat(to);
    to = parent[to];
  }
  return [];
}

var reverse = function(path){
  var reversedPath = [];
  for (var i = path.length-1,j = 0; i >= 0 ; i--,j++) {
    reversedPath[j] = path[i];
  }
  return reversedPath;
}

var shortestDistance = function(weights){
  var shortestDistanceVertex;
  var highestWeight = Infinity;
  var count = 0;
  for(var i in weights){
    if(weights[i] != undefined && highestWeight > weights[i]){
      shortestDistanceVertex = i;
      highestWeight = weights[i];
    }
    count++;
  }
  return shortestDistanceVertex;
}

var setInitial = function(vertices,from){
  var parent = {};
  for (var i in vertices){
    parent[vertices[i]] = Infinity;
  }
  if(from){
    parent[from] = 0;
  }
  return parent;
}

graphs.Edge = function(edgeName, from, to, weight){
  this.edgeName = edgeName;
  this.from  = from;
  this.to = to;
  this.weight = weight;
}
