[Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/Longer.html)
准确快速地从服务器获取数据 -> 快 -> 用户需要 


GraphQL API查询语言 数据查询运行时 
声明式数据获取语言 根据需要的数据列出请求数据的数据字段，而无需关注如何获取数据。
GraphQL服务与数据传输方式无关，但通常基于HTTP协议。

GraqhQL规范 GraphQL客户端与服务端通信的规范。规范描述的时语言的功能和特性。
具体而言，就是编写查询字段时应该使用的语言和语法，规定了类型检测系统以及系统的执行和验证引擎。但是规范没有规定使用什么具体的计算机语言, 如何存储数据或支哪些客户端。

[Graphql-js](https://github.com/graphql/graphql-js)
[graphql-spec](https://graphql.github.io/graphql-spec/)
[星球大战数据API](https://graphql.org/swapi-graphql)
[herokuapp](http://snowtooth.herokuapp.com/)
[snowtooth](http://snowtooth.moonhighway.com)
[swapi.co](https://swapi.co/)
公共GraphQL API
[SWAPI](https://graphql.github.io/swapi-graphql)
[Github API](https://developer.github.com/v4/) 重点学习
[Yelp](https://www.yelp.com/)
[GraphQL-APIs](https://github.com/APIs-guru/graphql-apis)
设计原则
+ 分层 查询字段层次分明 查询字段嵌套结构与返回数据结构类似。
+ 以产品为中心 
+ 强类型 GraphQL服务提供类型检测支持。每个数据点在模板中都有特定的类型，并且均会进行验证。
+ 客户端指定查询
+ 类型自查 GraphQL语言能够查询GraphQL服务的类型系统。
  
起源
Lee Byron / Nick Schrock / Dan Schafer
改进将数据发送到客户端应用的方式

数据传输史
向远程服务发起请求然后服务端返回数据响应。
1. RPC 远程过程调用 客户端向远程服务发起请求以执行某些操作，然后远程服务向客户端发送响应。
2. SOAP 简单对象访问协议 SOAP使用XML将消息编码并通HTTP传输,集成了类型检测系统，并且引入了面向资源的概念。SOAP所提供的结果具有可预测性，可是由于实现过程过于复杂导致失败的概率很高。
3. REST 表达性状态转移 一种面向资源的软件架构，用户可以通过执行GET、POST、PUT和DELETE等操作来浏览Web资源。把资源网络看成虚拟状态机,并且用户执行的动作都是机器内部的状态变化。
   REST的缺点：
   + 过量获取 返回太多不需要的数据
   + 获取不足 获取其他相关数据还需要发起额外的请求
   + 缺乏灵活性,需求变更不得不新增接口,沟通成本大
4. GraphQL
   所有数据集成于一个接口 

GraphQL客户端库
+ [Relay](https://relay.dev/en/)
+ [ApolloGraphQL](https://www.apollographql.com/) 重点学习
  
GraphQL API 工具
+ GraphiQL Facebook
+ [GraphQL Playground](https://www.graphqlbin.com/v2/new)  Prisma
语法高亮,代码补全和错误警告以及查看结果。

图论
顶点(节点)和边(连接)组成 G = (V,E)
无向图/有向图 节点是否存在方向和层次结构
节点的度数 连接该节点边的数量
欧拉路径 每条边只能访问一次的图
无向图拥有两个奇数度的节点或所有节点都是偶数度。
欧拉循环(环路) 起点和终点相同的欧拉图。
柯尼斯堡七桥问题 怎样才能在不经过同一座桥的情况下，依次走过柯尼斯堡岛上的七座桥

树 把节点分层排列的图 映射决策算法
节点的深度 指节点距离根节点有多远即经历的最少边数。
二叉树 每个节点的子节点不超过两个
二叉搜索树 遵循特定排序规则的二叉树。

SQL 结构化查询语言 数据存储在数据库中 SQL不具备订阅功能

查询字段是GraphQL的核心,其他还有变更和订阅功能。

# 查询
## 字段(Fields)
## 参数(Arguments)
## 别名(Aliases)
## 片段(Fragments)
## 内联片段(Inline Fragments)
    ... on 
## 操作名称(Operation name)
操作类型：query、mutation、subscription
## 变量(Variables)
    变量定义必须以`$`为前缀，必须参数后面加`!`标记，还可以为查询默认变量
## 指令(Directives)
1. @include(if: Boolean)
2. @skip(if: Boolean) 
## 变更(Mutations)
查询是并行执行，变更时线性执行
## 元字段(Meta fields)

# Schema
类型系统
基本类型(标量类型)
+ String
+ Int
+ Float
+ Bloolean
+ ID
自定义标量类型
```
scalar type
```
常用自由标量类型库: graphql-custom-types

枚举类型 允许字段返回一组限制性的字符集 
```
enum type {
    ...
}
```
列表 []
联合类型 | union 
接口 interface
联合类型和接口类型都是工具,可以用来创建包含不同对象类型的字段。如果对象包含完全不同的字段，最好使用联合类型。如果对象类型必须包含特定字段才能与另一种类型的对象进行接口关联,则需要使用接口。

参数
筛选数据
排序
分页
输入类型 input
返回类型
订阅 subscription
查询变量 $NAME
选择集 选择集间可以嵌套
指定别名
注释 
  单行注释 " "
 多行注释 """  """


连接
+ 一对一连接
+ 一对多连接
+ 多对多连接
+ 直通类型

  
对象类型 基本类型的分组 可以嵌套
片段 可以在多个操作中可重用的选择集 作用有点类似常量 内联片段

Schema优先
可靠且精心设计的Schema,它是前后端沟通的契约和准则,也是产品设计的指导方针。


# 开发原则
## 完整原则
1. 单一图
2. 联合实现
3. 追踪在注册表中的Schema
## 敏捷原则
4. 抽象、面向需求的Schema
5. 使用敏捷的方法开发Schema

特点
1. `请求需要的数据不多不少`,只返回需要的数据,`只需一次请求就可以多个相关资源`,不必在多个请求间查找数据。
2. 向GraphQL请求数据时，它会自动通过`类型检测系统`进行验证。每个GraphQL服务会在其GraphQL Schema中定义数据类型。可以将类型检测系统看作API数据的架构,并且自定义了数据对象的内容。
3. 获取资源只需要一个请求
4. 描述所有可能的类型的系统，便于维护
5. 通过类型来区分资源
6. 一个接口可以获取多个资源


自检 查询当前API schema细节的能力。 自检时将GraphQL文档添加到GraphQL Playground接口的方式。 __schema
抽象语法树(AST) 一种表示查询的分层结构对象,它包含了GraphQL查询详细信息的嵌套字段。查询文档是一个字符串,当向GraphQL服务发送查询时，查询文档会被解析为抽象语法树，并在操作之前经行验证。(AST形态的查询字段更容易修改和验证)。
文档至少包含一个定义，定义只能是OperationDefinition或FragmentDefinition中的一种。一个OperatonDefinition只能包含三种操作类型(query、mutation和subscription)中的一种。每种操作定义都包含了OperationType(操作类型)和SelectionSet(选择集)。

参数需要定义类型
!参数不能为空

Restfull
一个接口只能返回一个资源
通过url来区分资源

SOAP


实现方案
graphql
express-graphql

[apollo-server](https://www.apollographql.com/docs/apollo-server/)
apollo-server-express

Client ID
cbb0d4f8112f91373ca5
Client Secret
5ea37bd3dbe2557a2a9c8c7e05fdfb8ed2c2fca0