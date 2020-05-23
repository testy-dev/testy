import * as dagre from "dagre";
import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import { cloneDeep } from "lodash";

// Width and height is swapped because of use "dagre" lib from left to right
const size = {
  width: 50, // this is height
  height: 110, // this is width
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

export function distributeElements(model: any) {
  const clonedModel = cloneDeep(model);
  const nodes = distributeGraph(clonedModel);
  nodes.forEach((node: any) => {
    const modelNode = clonedModel.nodes.find(
      (item: any) => item.id === node.id
    );
    // Make graph from left to right
    // noinspection JSSuspiciousNameCombination
    modelNode.x = node.y;
    // noinspection JSSuspiciousNameCombination
    modelNode.y = node.x;
  });
  return clonedModel;
}

function distributeGraph(model: any) {
  const nodes = mapElements(model);
  const edges = mapEdges(model);
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({});
  graph.setDefaultEdgeLabel(() => ({}));
  //add elements to dagre graph
  nodes.forEach((node: any) => {
    graph.setNode(node.id, node.metadata);
  });
  edges.forEach((edge: any) => {
    if (edge.from && edge.to) {
      graph.setEdge(edge.from, edge.to);
    }
  });
  //auto-distribute
  dagre.layout(graph);
  return graph.nodes().map(node => graph.node(node));
}

function mapElements(model: any) {
  // dagre compatible format
  return model.nodes.map((node: any) => ({
    id: node.id,
    metadata: { ...size, id: node.id },
  }));
}

function mapEdges(model: any) {
  // returns links which connects nodes
  // we check are there both from and to nodes in the model. Sometimes links can be detached
  return model.links
    .map((link: any) => ({
      from: link.source,
      to: link.target,
    }))
    .filter(
      (item: any) =>
        model.nodes.find((node: any) => node.id === item.from) &&
        model.nodes.find((node: any) => node.id === item.to)
    );
}

export default autoDistribute;
