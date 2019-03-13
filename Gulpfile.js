var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject("./tsconfig.json");

const build_typescript = () => tsProject.src()
    .pipe(tsProject())
    .on("error", (err) => { })
    .js.pipe(gulp.dest("build"));


gulp.task("start-watchers", () => {
    gulp.watch(tsProject.config.include, build_typescript);
})

gulp.task("default-nowatch", build_typescript)

gulp.task("default", gulp.series("default-nowatch", "start-watchers"));

