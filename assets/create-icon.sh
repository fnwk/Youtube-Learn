#!/bin/bash
cd "$(dirname "$0")"

# Find all .svg files
IFS=$'\n'
paths=($(find . -name "*.svg"))
unset IFS

# Check if any .svg files are found
if [ ${#paths[@]} -eq 0 ]; then
  echo "No .svg files found."
  exit 1
fi

# Create or overwrite Icon.tsx
output_file="Icon.tsx"
echo "" > $output_file
echo "import React from 'react';" >> $output_file
echo "import { SvgProps } from 'react-native-svg';" >> $output_file

# Import all SVGs
for i in "${paths[@]}"; do
  file_name=$(basename "$i" .svg)
  file_name_pascal=$(echo "$file_name" | sed -r 's/(^|-)(\w)/\U\2/g; s/-//g')
  echo "import $file_name_pascal from '$i';" >> $output_file
done

# Create ICONS object
echo "" >> $output_file
echo "const ICONS = {" >> $output_file
for i in "${paths[@]}"; do
  file_name=$(basename "$i" .svg)
  file_name_pascal=$(echo "$file_name" | sed -r 's/(^|-)(\w)/\U\2/g; s/-//g')
  echo "  $file_name_pascal," >> $output_file
done
echo "};" >> $output_file

# Add TypeScript types and AppIcon component
cat <<EOL >> $output_file

export type IconType = keyof typeof ICONS;

interface IconProps extends SvgProps {
  name: IconType;
  className?: string;
}

const AppIcon = ({ name, ...props }: IconProps) => {
  const CurrentIcon = ICONS[name];
  return <CurrentIcon {...props} />;
};

export const Icon = React.memo(AppIcon);
EOL

echo "Icon.tsx has been generated successfully."
