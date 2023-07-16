//将 T 转换为深度只读的类型别名。
type DeepReadonly<T> =
//数组 调用 DeepReadonlyArray<T>
  T extends (infer R)[] ? DeepReadonlyArray<R> :
  //对象，调用 DeepReadonlyObject<T> 
  T extends object ? DeepReadonlyObject<T> :
  T;
//将数组 T 转换为深度只读数组的类型别名。
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
//将对象 T 转换为深度只读对象的类型别名。
type DeepReadonlyObject<T> = {
    //索引类型查询和映射类型
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
//使用 DeepReadonly<X> 来将示例中的 X 对象转换为深度只读对象
type X = {
    x: {
      a: 1;
      b: 'hi';
    };
    y: 'hey';
  };
  
  type Expected = {
    readonly x: {
      readonly a: 1;
      readonly b: 'hi';
    };
    readonly y: 'hey';
  };
  
  type Todo = DeepReadonly<X>; 