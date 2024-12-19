export const initaldot: string = `digraph G {
  A -> B;
}`;

export const examplesData: Record<string, string> = {

  basic_undirected: `graph G {
  A -- B;
  B -- C;
  C -- A;
}`,

  basic_directed: `digraph G {
  A -> B;
  B -> C;
  C -> A;
}`,

  basic_weighted: `digraph G {
  A -> B [label="5"];
  B -> C [label="10"];
  C -> A [label="15"];
}`,

  tree: `digraph G {
  A -> B;
  A -> C;
  B -> D;
  B -> E;
  C -> F;
  C -> G;
}`,

  subgraph: `digraph G {
  subgraph cluster_0 {
    label="Subgraph A";
    a -> b;
    b -> c;
    c -> d;
  }

  subgraph cluster_1 {
    label="Subgraph B";
    a -> f;
    f -> c;
  }
}`,

  automaton: `digraph finite_state_machine {
  fontname="Helvetica,Arial,sans-serif"
	node [fontname="Helvetica,Arial,sans-serif"]
	edge [fontname="Helvetica,Arial,sans-serif"]
	rankdir=LR;
	node [shape = doublecircle]; 0 3 4 8;
	node [shape = circle];
	0 -> 2 [label = "SS(B)"];
	0 -> 1 [label = "SS(S)"];
	1 -> 3 [label = "S($end)"];
	2 -> 6 [label = "SS(b)"];
	2 -> 5 [label = "SS(a)"];
	2 -> 4 [label = "S(A)"];
	5 -> 7 [label = "S(b)"];
	5 -> 5 [label = "S(a)"];
	6 -> 6 [label = "S(b)"];
	6 -> 5 [label = "S(a)"];
	7 -> 8 [label = "S(b)"];
	7 -> 5 [label = "S(a)"];
	8 -> 6 [label = "S(b)"];
	8 -> 5 [label = "S(a)"];
}`,

  patchwork: `graph {
	node [style=filled]
	"$2"  [area= 100 fillcolor=gold]
	"$1"  [area= 50 fillcolor=gold]
	"50c" [area= 25 fillcolor=silver]
	"20c" [area= 10 fillcolor=silver]
	"10c" [area= 5 fillcolor=silver]
	"5c"  [area= 2.5 fillcolor=silver]
}`
};