import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"

export const LogoIcon = (props: SvgProps) => {
  return (
    <Svg width={1200} height={1200} viewBox="0 0 1200 1200" {...props}>
      <G fill={props.fill ? props.fill : "#FFF"} fillRule="nonzero">
        <Path d="M633.978 67.491c-10.4-21.827-25.577-32.477-45.837-31.95-24.369.644-39.546 13.681-38.97 35.11.28 10.732 4.6 18.515 12.641 23.044 8.358 4.518 21.457 8.907 39.628 13.155 16.257 3.687 24.862 5.98 36.752 11.984 17.607 8.38 26.2 20.786 27.773 43.795 1.173 46.72-26.998 71.145-71.603 72.327-42.739 1.17-74.678-21.066-84.362-63.468l25.683-10.79c9.39 32.605 28.852 48.51 57.963 47.738 27.866-.726 45.227-15.086 44.523-41.278a28.41 28.41 0 00-8.44-19.99c-2.289-2.153-5.81-3.955-10.928-5.71-9.919-3.84-15.67-5.595-31.916-8.954-15.612-3.382-23.265-5.384-36.095-11.352-17.948-8.696-27.49-22.33-29.498-48.815-.446-17.989 5.177-32.934 16.903-44.637 11.738-11.997 28.03-18.106 49.3-18.667 35.766-.948 59.724 18.947 70.57 45.503L633.978 67.49zM1026.39 178L1116 285.732l-20.436 16.897-71.905-86.37-48.926 40.445 61.823 74.24-20.46 16.91-61.752-74.252-60.134 49.688 73.863 88.812L947.626 429 856 318.838zM1200 726.437l-5.346 25.99L962 785l5.792-28.11 61.938-7.602 17.446-84.788-53.931-31.39 5.792-28.11L1200 726.437zm-37.986 5.762l-90.686-53.456-13.753 66.844 104.439-13.388zM823.208 1122.397c19.121 14.668 37.4 17.269 55.143 7.649 21.307-11.567 28.857-29.979 18.607-48.775-5.131-9.387-12.494-14.342-21.67-14.727-9.466-.233-23.07 1.796-41.117 6.215-16.07 4.081-24.754 5.912-38.02 5.97-19.437.513-32.667-6.623-44.507-26.329-22.288-40.88-8.391-75.279 30.646-96.465 37.4-20.3 75.783-15.007 103.6 18.213l-17.906 21.163c-23.142-24.661-47.593-30.002-73.06-16.184-24.357 13.234-33.252 33.815-20.734 56.727a28.396 28.396 0 0016.585 13.957c2.992.887 6.942.898 12.284.14 10.519-1.072 16.362-2.122 32.351-6.471 15.37-4.046 23.072-5.725 37.155-6.215 19.87-.396 34.538 7.393 48.306 29.99 8.579 15.742 10.402 31.576 5.306 47.236-4.944 15.94-16.632 28.72-35.18 38.794-31.276 16.977-61.56 10.156-83.228-8.512l15.44-22.376zM378.826 1185.055c-23.339-9.263-38.735-25.883-46.515-49.976-7.86-23.8-4.907-52.806 8.327-86.548 13.233-33.742 30.769-56.958 52.781-69.262 21.897-11.988 44.433-13.556 67.772-4.304 23.338 9.251 38.734 25.882 46.584 49.683 7.744 24.093 4.79 53.11-8.431 86.852-13.222 33.743-30.78 56.959-52.677 69.005-21.909 12.234-44.491 13.801-67.841 4.55zm9.675-24.667c16.035 6.375 31.397 5.006 46.223-4.374 14.687-9.087 27.292-27.485 38.107-55.063 10.814-27.579 14.094-49.683 9.651-66.666-4.558-16.724-14.86-28.272-30.908-34.642-16.048-6.37-31.42-5.03-46.119 4.023-14.791 9.357-27.408 27.777-38.223 55.368-10.815 27.59-14.094 49.66-9.535 66.396 4.453 17.064 14.733 28.608 30.804 34.958zM8.21 750.977L0 724.524 211.734 660l8.914 28.88L84.45 826.791l163.34-49.816 8.21 26.477L44.254 868l-8.902-28.868 136.151-137.959zM180.404 264.42c-23.695-4.67-41.23 1.167-52.803 17.67-13.923 19.843-12.438 39.744 5.132 52 8.779 6.14 17.593 7.295 25.986 3.56 8.58-4.004 19.873-11.87 34.042-23.87 12.578-10.808 19.522-16.34 31.375-22.258 17.185-9.14 32.206-8.626 51.611 3.77 38.238 26.705 41.172 63.73 15.688 100.087-24.408 34.83-61.161 47.202-100.919 29.799l6.546-26.939c31.762 11.812 56.03 5.731 72.665-18.01 15.91-22.702 14.66-45.089-6.792-60.076a28.44 28.44 0 00-21.042-5.1c-3.074.548-6.616 2.334-11.058 5.345-8.955 5.661-13.76 9.21-26.092 20.205-11.947 10.504-18.085 15.395-30.488 22.106-17.616 9.21-34.228 8.754-56.65-5.369-14.728-10.283-23.379-23.67-25.88-39.976-2.678-16.481 2.069-33.149 14.18-50.423 20.422-29.18 50.593-36.522 78.322-29.426l-3.823 26.904z" />
      </G>
    </Svg>
  )
}