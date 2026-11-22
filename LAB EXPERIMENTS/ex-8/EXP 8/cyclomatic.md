# Cyclomatic Complexity

Sample program: find the largest of three numbers.

```mermaid
flowchart TD
  N1([1 Start]) --> N2[/2 Read a,b,c/]
  N2 --> N3{3 a>b?}
  N3 -- Yes --> N4{4 a>c?}
  N3 -- No --> N5{5 b>c?}
  N4 -- Yes --> N6[6 max=a]
  N4 -- No --> N7[7 max=c]
  N5 -- Yes --> N8[8 max=b]
  N5 -- No --> N7
  N6 --> N9[/9 Print max/]
  N7 --> N9
  N8 --> N9
  N9 --> N10([10 End])
```

| Quantity | Value |
|---|---|
| Nodes (N) | 10 |
| Edges (E) | 12 |
| Predicate nodes (P) | 3 |

- V(G) = E - N + 2 = 12 - 10 + 2 = **4**
- V(G) = P + 1 = 3 + 1 = **4**

Independent paths: 1-2-3-4-6-9-10, 1-2-3-4-7-9-10, 1-2-3-5-8-9-10, 1-2-3-5-7-9-10
