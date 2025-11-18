#include <bits/stdc++.h>
#include <set>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

class Solution
{
public:
    void dfs(vector<vector<int>> &adj, vector<int> &visited2, int node)
    {
        visited2[node] = 1;
        for (int i = 0; i < adj[node].size(); i++)
        {
            if (!visited2[adj[node][i]]) dfs(adj,visited2,adj[node][i]);
        }
    }
    void pushall(vector<vector<int>> &adj, int node, set<int, greater<int>> &st, vector<int> &visited)
    {
        visited[node] = 1;
        st.insert(node);
        for (int i = 0; i < adj[node].size(); i++)
        {
            if (!visited[adj[node][i]])pushall(adj,adj[node][i],st,visited);
        }
    }
    vector<int> processQueries(int c, vector<vector<int>> &connections, vector<vector<int>> &queries)
    {
        vector<vector<int>> adj(c + 1);
        for (int i = 0; i < connections.size(); i++)
        { adj[connections[i][0]].push_back(connections[i][1]);
        }
        vector<int> visited2(c + 1, 0);
        vector<int> comp;
        for (int i = 0; i < c; i++)
        {
            if (!visited2[i])
            {
                dfs(adj, visited2, i);
                comp.push_back(i);
            }
        }
        vector<int> ans;
        for (int i = 0; i < comp.size(); i++)
        {
            set<int, greater<int>> st;
            vector<int> visited(c + 1, 0);
            pushall(adj, comp[i], st, visited);
            for (int j = 0; j < queries.size(); j++)
            { if(queries[j][0]==1)
                { if(st.find(queries[j][1])!=st.end())
                    { ans.push_back(queries[j][1]);
                    }
                    else
                    {
                        ans.push_back(*st.begin());
                    }
                }
                else
                { st.erase(queries[j][1]);
                }
            }
 }
    return ans;

}
};