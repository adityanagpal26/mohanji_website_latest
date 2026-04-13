import React from 'react'

type Props = {
  style?: 'gold' | 'grey' | 'space'
  spacing?: 'small' | 'medium' | 'large'
}

const spacingClasses = {
  small: 'my-4',
  medium: 'my-8',
  large: 'my-16',
}

export function DividerBlock({ style = 'gold', spacing = 'medium' }: Props) {
  if (style === 'space') return <div className={spacingClasses[spacing]} />

  return (
    <div className={`container ${spacingClasses[spacing]}`}>
      <hr className={style === 'gold' ? 'border-t-2 border-[#E2B748] w-16' : 'border-t border-gray-200'} />
    </div>
  )
}
