import * as dagre from "dagre";
import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import { cloneDeep } from "lodash";

const size = {
  width: 60,
  height: 60,
};

function autoDistribute(engine: DiagramEngine) {
  const distributedModel = getDistributedModel(engine);
  engine.setDiagramModel(distributedModel);
}

function getDistributedModel(engine: DiagramEngine) {
  const model = engine.getDiagramModel();
  const serialized = model.serializeDiagram();
  const distributedSerializedDiagram = distributeElements(serialized);

  // deserialize the model
  const deSerializedModel = new DiagramModel();
  deSerializedModel.deSerializeDiagram(distributedSerializedDiagram, engine);
  return deSerializedModel;
}

export function distributeElements(model) {
  const clonedModel = cloneDeep(model);
  const nodes = distributeGraph(clonedModel);
  nodes.forEach(node => {
    const modelNode = clonedModel.nodes.find(item => item.id === node.id);
    modelNode.x = node.x;
    modelNode.y = node.y;
  });
  return clonedModel;
}

function distributeGraph(model) {
  const nodes = mapElements(model);
  const edges = mapEdges(model);
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({});
  graph.setDefaultEdgeLabel(() => ({}));
  //add elements to dagre graph
  nodes.forEach(node => {
    graph.setNode(node.id, node.metadata);
  });
  edges.forEach(edge => {
    if (edge.from && edge.to) {
      graph.setEdge(edge.from, edge.to);
    }
  });
  //auto-distribute
  dagre.layout(graph);
  return graph.nodes().map(node => graph.node(node));
}

function mapElements(model) {
  // dagre compatible format
  return model.nodes.map(node => ({
    id: node.id,
    metadata: { ...size, id: node.id },
  }));
}

function mapEdges(model) {
  // returns links which connects nodes
  // we check are there both from and to nodes in the model. Sometimes links can be detached
  return model.links
    .map(link => ({
      from: link.source,
      to: link.target,
    }))
    .filter(
      item =>
        model.nodes.find(node => node.id === item.from) &&
        model.nodes.find(node => node.id === item.to)
    );
}

export default autoDistribute;
