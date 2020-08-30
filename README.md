### Jest Memory Leak Example
This is a way to reproduce a Jest Memory Leak Issue. The issue appears to happen with just having a certain amount of expects.
When running with `--expose-gc`, having 23 or more expects in a file causes a memory leak. Having 22 does not

23 Expects per file:
```
node --expose-gc ./node_modules/.bin/jest --runInBand --logHeapUsage test/memoryLeak
 PASS  test/memoryLeak/test10.spec.js (19 MB heap size)
 PASS  test/memoryLeak/test.spec.js (22 MB heap size)
 PASS  test/memoryLeak/test2.spec.js (26 MB heap size)
 PASS  test/memoryLeak/test6.spec.js (30 MB heap size)
 PASS  test/memoryLeak/test4.spec.js (34 MB heap size)
 PASS  test/memoryLeak/test7.spec.js (37 MB heap size)
 PASS  test/memoryLeak/test5.spec.js (41 MB heap size)
 PASS  test/memoryLeak/test3.spec.js (45 MB heap size)
 PASS  test/memoryLeak/test9.spec.js (48 MB heap size)
 PASS  test/memoryLeak/test8.spec.js (52 MB heap size)
 PASS  test/memoryLeak/test1.spec.js (56 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       66 passed, 66 total
Snapshots:   0 total
Time:        1.703 s, estimated 2 s
Ran all test suites matching /test\/memoryLeak/i.

```

22 Expects per file:
```
 node --expose-gc ./node_modules/.bin/jest --runInBand --logHeapUsage test/noMemoryLeak/
 PASS  test/noMemoryLeak/test3.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test7.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test10.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test8.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test1.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test2.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test6.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test5.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test4.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test9.spec.js (19 MB heap size)
 PASS  test/noMemoryLeak/test.spec.js (19 MB heap size)

Test Suites: 11 passed, 11 total
Tests:       66 passed, 66 total
Snapshots:   0 total
Time:        1.565 s, estimated 2 s
Ran all test suites matching /test\/noMemoryLeak\//i.
```

The memory leak also occurs with less 22 expects or less if `--expose-gc` is not included

```
node ./node_modules/.bin/jest --runInBand --logHeapUsage test/noMemoryLeak/
    PASS  test/noMemoryLeak/test3.spec.js (27 MB heap size)
    PASS  test/noMemoryLeak/test7.spec.js (32 MB heap size)
    PASS  test/noMemoryLeak/test10.spec.js (39 MB heap size)
    PASS  test/noMemoryLeak/test8.spec.js (45 MB heap size)
    PASS  test/noMemoryLeak/test5.spec.js (52 MB heap size)
    PASS  test/noMemoryLeak/test1.spec.js (42 MB heap size)
    PASS  test/noMemoryLeak/test6.spec.js (47 MB heap size)
    PASS  test/noMemoryLeak/test2.spec.js (56 MB heap size)
    PASS  test/noMemoryLeak/test4.spec.js (62 MB heap size)
    PASS  test/noMemoryLeak/test9.spec.js (70 MB heap size)
    PASS  test/noMemoryLeak/test.spec.js (77 MB heap size)
   
   Test Suites: 11 passed, 11 total
   Tests:       66 passed, 66 total
   Snapshots:   0 total
   Time:        1.414 s, estimated 2 s
   Ran all test suites matching /test\/noMemoryLeak\//i.
```
