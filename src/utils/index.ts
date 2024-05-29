export const convertImage = (image?: string | null) => {
  if (image) {
    if (
      image.includes("https://localhost:8000") &&
      process.env.NEXT_APP_API_URL
    ) {
      return image.replace(
        "https://localhost:8000",
        process.env.NEXT_APP_API_URL
      );
    } else if (process.env.NEXT_APP_API_URL) {
      return `${process.env.NEXT_APP_API_URL}/${image}`;
    }
  }
};

export const getCateUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const cate_name = searchParams.get("cate_name");
  const cate_level1_id = searchParams.get("cate_level1_id");
  const cate_level2_id = searchParams.get("cate_level2_id");
  const cate_level3_id = searchParams.get("cate_level3_id");
  if (cate_level3_id) {
    return `cate_level1_id=${cate_level1_id}&cate_level2_id=${cate_level2_id}&cate_level3_id=${cate_level3_id}&cate_name=${
      cate_name && encodeURIComponent(cate_name)
    }`;
  } else if (cate_level2_id) {
    return `cate_level1_id=${cate_level1_id}&cate_level2_id=${cate_level2_id}&cate_name=${
      cate_name && encodeURIComponent(cate_name)
    }`;
  } else if (cate_level1_id) {
    return `cate_level1_id=${cate_level1_id}&cate_name=${
      cate_name && encodeURIComponent(cate_name)
    }`;
  }
};
